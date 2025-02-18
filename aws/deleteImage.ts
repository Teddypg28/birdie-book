import s3Client from "./s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default async function deleteImage(bucket: string, key: string) {

    try {

        const command = new DeleteObjectCommand({
            Bucket: bucket, 
            Key: key
        })
        await s3Client.send(command)

    } catch (error) {

        console.log('Error deleting the image')
        
    }

}