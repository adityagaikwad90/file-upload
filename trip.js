
// // Configure AWS credentials and S3 bucket
// AWS.config.update({
//     accessKeyId: 'AKIAZI2LE6KYQXSS4AN5',  // Replace with your Access Key
//     secretAccessKey: 'moU6B6jieXtIZuDG8iJ06PRZY4RVNYYpyVgvqdnB',  // Replace with your Secret Key
//     region: 'ca-central-1'
//   // Replace with your AWS region, e.g., 'us-east-1'
// });

// // Create a new instance of the S3 service
// const s3 = new AWS.S3({
//     params: { Bucket: 'mysisbucket' }  // Replace 'your-bucket-name' with your actual S3 bucket name
// });

// // Function to handle the file upload
// function uploadPhotos() {
//     console.log("Upload button clicked!");

//     // Get the file input element
//     const fileInput = document.getElementById('fileInput');
//     const gallery = document.getElementById('photoGallery');

//     // Ensure that files are selected
//     if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
//         console.log("No file selected.");
//         alert("Please select a file to upload.");
//         return;
//     }

//     // Iterate through selected files and upload each one
//     Array.from(fileInput.files).forEach(file => {
//         console.log("Uploading file: ", file.name);

//         // Prepare parameters for the S3 upload
//         const params = {
//             Bucket: 'mysisbucket',  // Replace with your S3 bucket name
//             Key: file.name,  // Use the file name as the S3 key
//             Body: file,  // The actual file content
//             ACL: 'public-read'  // Set access control, adjust as necessary
//         };

//         // Upload the file to S3
//         s3.upload(params, function (err, data) {
//             if (err) {
//                 console.error("Error uploading file: ", err);
//                 alert("File upload failed! Please try again.");
//                 return;
//             }

//             // Log success and display the image in the gallery
//             console.log("File uploaded successfully: ", data.Location);
//             const img = document.createElement('img');
//             img.src = data.Location;  // Set the source to the S3 URL of the uploaded file
//             img.alt = file.name;  // Optional: Add alt text to the image
//             img.style.width = '200px';  // Optional: Add some styling
//             gallery.appendChild(img);  // Add the image to the gallery
//         });
//     });
// }


//

AWS.config.update({
    accessKeyId: 'AKIAZI2LE6KYQXSS4AN5',  // Replace with your Access Key
    secretAccessKey: 'moU6B6jieXtIZuDG8iJ06PRZY4RVNYYpyVgvqdnB',  // Replace with your Secret Key
    region: 'ca-central-1'
  // Replace with your AWS region, e.g., 'us-east-1'
});

const s3 = new AWS.S3({ params: { Bucket: 'mysisbucket' } });

function uploadPhotos() {
    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('photoGallery');
    
    if (!fileInput.files.length) {
        alert('Please select a file to upload.');
        return;
    }

    Array.from(fileInput.files).forEach(file => {
        const params = {
            Key: file.name,
            Body: file,
            ACL: 'public-read',
            ContentType: file.type
        };

        // Enable multi-part upload for large files
        const options = { partSize: 10 * 1024 * 1024, queueSize: 1 }; // 10 MB part size, queue size of 1
        s3.upload(params, options)
            .on('httpUploadProgress', function(evt) {
                console.log('Progress:', Math.round((evt.loaded / evt.total) * 100) + '%');
            })
            .send(function(err, data) {
                if (err) {
                    alert("File upload failed! Please try again.");
                    console.error("Error uploading file: ", err);
                    return;
                }

                alert("File uploaded successfully!");
                console.log("File uploaded successfully", data.Location);
                const img = document.createElement('img');
                img.src = data.Location;
                gallery.appendChild(img);
            });
    });
}

// steps to do this project 
// 1. create a new bucket in AWS S3
// 2. install AWS SDK
// 3. create a new file and add the code above 
// 4. add the AWS SDK to the file
// 5. add the AWS credentials to the file
// 6. run the file in the browser
// 7. select a file to upload 
// 8. the file will be uploaded to S3 and displayed in the gallery


// some more steps to do in AWS for this project 
// 1. create a new IAM user and give it the necessary permissions to upload files to S
// 2.create a new IAM role and give it the necessary permissions to upload files to S
// 3. create a new S3 bucket policy and give it the necessary permissions to upload files
// 4. create a new S3 bucket CORS configuration and give it the necessary permissions to upload
// 5. create a new S3 bucket ACL and give it the necessary permissions to upload


// To upload photos to an S3 bucket on AWS from a webpage, you will need the following setup:

// AWS S3 Bucket: Create an S3 bucket to store the uploaded images.
// AWS SDK for JavaScript: Use the AWS SDK in the frontend to upload the photos.
// IAM Policy: Ensure you have appropriate permissions to upload files to S3.


// 2. Configure IAM Permissions

// Create an IAM user or role with permission to upload files to the S3 bucket. The policy will look something like this:

// {
//     "Version": "2012-10-17",
//     "Statement": [
//       {
//         "Effect": "Allow",
//         "Action": "s3:PutObject",
//         "Resource": "arn:aws:s3:::your-bucket-name/*"
//       }
//     ]
//   }
  
// 3. Install AWS SDK for JavaScript
// <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1.24.min.js"></script>

//  4 write a java script code as above 
// Create Access Key and Secret Key:
// create new user
// create access key (local)
// create secret key (local)
// Set Permissions =AmazonS3FullAccess 
// update javascript code 

// 3. CORS Configuration
// Create a new CORS configuration for the S3 bucket to allow cross-origin requests.
// Go to the S3 Console.
// Select your bucket.
// Under the Permissions tab, find CORS configuration.
// Add the following CORS policy:
// [
//     {
//       "AllowedHeaders": ["*"],
//       "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
//       "AllowedOrigins": ["*"],  // Or specify your domain
//       "ExposeHeaders": ["ETag"],
//       "MaxAgeSeconds": 3000
//     }
//   ]
// 4. Bucket Policy
// Go to your bucket's Permissions tab and look at the Bucket Policy. Add something like this:
// {
//     "Version": "2012-10-17",
//     "Statement": [
//       {
//         "Sid": "PublicReadWriteAccess",
//         "Effect": "Allow",
//         "Principal": "*",
//         "Action": "s3:PutObject",
//         "Resource": "arn:aws:s3:::your-bucket-name/*"
//       }
//     ]
//   }
// ... CORS Configuration

// Check the CORS configuration of your S3 bucket. Go to the AWS S3 console, select your bucket, and add this configuration:
// <?xml version="1.0" encoding="UTF-8"?>
// <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
//   <CORSRule>
//     <AllowedOrigin>*</AllowedOrigin> <!-- You can restrict this to specific domains later -->
//     <AllowedMethod>PUT</AllowedMethod>
//     <AllowedMethod>POST</AllowedMethod>
//     <AllowedMethod>GET</AllowedMethod>
//     <AllowedHeader>*</AllowedHeader>
//   </CORSRule>
// </CORSConfiguration>

// 5. Add or Modify CORS Rules
// Click on the Permissions tab for the selected bucket.

// 6. Use AWS CLI or SDK for CORS Configuration
// If the S3 console gives issues, you can also configure CORS using the AWS CLI or SDK. Here’s how you can do it with the AWS CLI:
// aws s3api put-bucket-cors --bucket your-bucket-name --cors-configuration file://cors.json
// {
//     "CORSRules": [
//       {
//         "AllowedOrigins": ["*"],
//         "AllowedMethods": ["GET", "PUT", "POST"],
//         "AllowedHeaders": ["*"]
//       }
//     ]
//   }
  

  





