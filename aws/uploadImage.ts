import s3Client from "./s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export default async function uploadImage(file: File) {

    try {

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME as string,
            Key: `${Date.now()}-timestamp-separator-${file.name}`,
            Body: file.stream()
        })
        await s3Client.send(command)
        
    } catch (error) {

        console.log('Error uploading image')
        
    }

}