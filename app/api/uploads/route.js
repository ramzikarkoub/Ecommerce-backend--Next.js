// import fs from "fs";
// import { DynamoDB } from "@aws-sdk/client-dynamodb";
// import formidable from "formidable";

// const s3Client = new DynamoDB({
//   // endpoint: process.env.END_POINT,
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: process.env.S3_UPLOAD_KEY,
//     secretAccessKey: process.env.S3_UPLOAD_SECRET,
//   },
// });

// export const config = {
//   api: { bodyParser: false },
// };
// const handler = async (req, res) => {
//   const form = formidable();
//   form.parse(req, async (err, fields, files) => {
//     if (!files.demo) {
//       res.status(400).send("no file uploaded");
//       return;
//     }
//     try {
//       return s3Client.putObject(
//         {
//           Bucket: process.env.S3_UPLOAD_BUCKET,
//           Key: files.demo.originalFilename,
//           Body: fs.createReadStream(files.demo.filepath),
//           ACL: "public-read",
//         },
//         async () => res.status(201).send("file uploaded")
//       );
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("error uploading file");
//     }
//   });
// };
// export { handler as GET, handler as POST };

// import multiparty from "multiparty";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import fs from "fs";
// import mime from "mime-types";
// import formidable from "formidable";
// // import { mongooseConnect } from "@/lib/mongoose";
// // import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
// const bucketName = "ramzi-next-ecommerce";

// export async function POST(req, res) {
//   // await mongooseConnect();
//   // await isAdminRequest(req, res);

//   const form = new multiparty.Form();
//   const data = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       console.log(err);
//       resolve({ fields, files });
//       console.log(fields);
//       console.log(files);
//     });
//   });
//   console.log(`data: `, JSON.stringify(data));
//   console.log("length:", files.file.length);
//   const client = new S3Client({
//     region: "us-east-1",
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     },
//   });
//   const links = [];
//   for (const file of files.file) {
//     const ext = file.originalFilename.split(".").pop();
//     const newFilename = Date.now() + "." + ext;
//     await client.send(
//       new PutObjectCommand({
//         Bucket: bucketName,
//         Key: newFilename,
//         Body: fs.readFileSync(file.path),
//         ACL: "public-read",
//         ContentType: mime.lookup(file.path),
//       })
//     );
//     const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
//     links.push(link);
//   }
//   return res.json({ links });
// }

// const uploadImage = async (req, res) => {
//   const form = new multiparty.Form();
//   const data = await new Promise((resolve, reject) => {
//     form.parse(req, function (err, fields, files) {
//       if (err) reject({ err });
//       resolve({ fields, files });
//     });
//   });
//   console.log(`data: `, JSON.stringify(data));

//   res.status(200).json({ success: true });
// };

// export default uploadImage;

// export const config = {
//   api: { bodyParser: false },
// };
