import s3Client from "./s3Client";
import { ListObjectsV2Command } from '@aws-sdk/client-s3'

export default async function getUploadedImages(bucket: string) {

    try {

        const command = new ListObjectsV2Command({
            Bucket: bucket
        })
        const response = await s3Client.send(command)
        return response.Contents
        
    } catch (error) {

        console.log('Error retrieving uploaded images')
        
    }

}