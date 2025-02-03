const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types"); // need to install this package for this

// Generate a unique filename using nanoid
const generateNanoidFilename = async (file) => {
    const { nanoid } = await import("nanoid");
    const uniqueSuffix = nanoid();
    const ext = path.extname(file.originalname);
    return `${uniqueSuffix}${ext}`;
};

// Check file type
const checkFileType = (file, extensions, cb) => {
    if (!extensions || extensions.length === 0) {
        // If no extensions are provided, allow any file
        cb(null, true);
    } else {
        const fileExt = path.extname(file.originalname).toLowerCase().slice(1); // Get file extension without dot
        const mimeType = file.mimetype;

        // Check if file's extension and mimetype match any of the allowed extensions
        const isExtensionValid = extensions.includes(fileExt);
        const isMimeTypeValid = extensions.some(
            (ext) => mimeType === getMimeTypeFromExtension(ext)
        );

        if (isExtensionValid && isMimeTypeValid) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Please provide valid files with the following extensions: ${extensions.join(", ")}`
                )
            );
        }
    }
};

const determineDestination = (file) => {
  // Check if file is defined and has a mimetype
  if (!file || !file.mimetype) {
      throw new Error("File or mimetype is undefined");
  }

  console.log("File object:", file);

  const mimeType = file.mimetype;

  if (mimeType.startsWith("image")) {
      return { destination: "uploads/images" };
  } else if (mimeType.startsWith("video")) {
      return { destination: "uploads/videos" };
  }
  
  return {
      destination: "uploads/others", // Default folder for other files
  };
};

// Set storage engine
const storage = () =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = determineDestination(file); // Call here, where file object is available
            const destinationDir = uploadPath.destination; // Use only the destination directory

            
            // Ensure the directory exists
            fs.mkdir(destinationDir, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                    return cb(err);
                }
                cb(null, destinationDir);
            });
        },
        filename: async (req, file, cb) => {
            const newFileName = await generateNanoidFilename(file);
            cb(null, newFileName);
        },
    });

// Improved getMimeTypeFromExtension using mime-types package
const getMimeTypeFromExtension = (extension) => {
    return mime.lookup(extension) || null;
};

// Middleware for file upload
exports.ImageUpload = (extensions = null, fieldName = "files") => {
    return (req, res, next) => {
        const upload = multer({
            storage: storage(),
            limits: { fileSize: 100 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                console.log("File in filter:", file); // Log each file before filtering
                checkFileType(file, extensions, cb);
            },
        }).array(fieldName);

        upload(req, res, (err) => {
            if (err) {
                console.error("Upload error:", err.message); // Log upload error
                return res.status(400).json({ error: err.message });
            }

            // Log the entire req.files array to inspect its structure
            console.log("Uploaded files:", req.files);

            const files = req.files;
 
            // If no files uploaded, skip deleting old files and continue
            if (!files || files.length === 0) {
                req.filePaths = req.body.old_files ? [req.body.old_files] : [];
                return next();
            }

            // Check if there are old files to delete
            if (req.body.old_files) {
                const oldFiles = Array.isArray(req.body.old_files)
                    ? req.body.old_files
                    : [req.body.old_files];

                // Log the old files to be deleted
                console.log("Old files to delete:", oldFiles);

                // Use the first uploaded file to determine the upload path
                const uploadPath = determineDestination(files[0]);
                const destination = uploadPath.destination;

                // Delete old files
                oldFiles.forEach((oldFile) => {
                    const oldFilePath = path.join(destination, oldFile);
                    // Check if file exists before attempting to delete
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlink(oldFilePath, (error) => {
                            if (error) {
                                console.error(`Error deleting old file: ${oldFilePath}`, error);
                            } else {
                                console.log(`Old file deleted successfully: ${oldFilePath}`);
                            }
                        });
                    } else {
                        console.warn(`File not found: ${oldFilePath}`);
                    }
                });
            }

            // Attach file paths to the request object
            req.filePaths = files.map((file) => file.filename);
            console.log("File paths to be saved:", req.filePaths); // Log the file paths
            
            next();
        });
    };
};

