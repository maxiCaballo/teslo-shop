import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false //Para no parsear el body, por default next lo parsea.
  }
};

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return uploadImages(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  //!Para guardarlo en FileSystem, no se debería hacer.
  //   const data = fs.readFileSync(file.filepath); //Path temporal que se le asigna al archivo mientras no se guarda
  //   fs.writeFileSync(`./public/${file.originalFilename}`, data); //Donde lo quiero guardar, con que nombre y que quiero guardar
  //   fs.unlinkSync(file.filepath); //Borro el path temporal que se le asignó para que no se junte mucha basura
  //   return;

  const data = await cloudinary.uploader.upload(file.filepath);
  return data.secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });

      if (err) return reject(err);

      const cloudinaryFilePath = await saveFile(files.images as formidable.File);
      resolve(cloudinaryFilePath);
    });
  });
};

const uploadImages = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const cloudinaryFilePath = await parseFiles(req); //Desde el front mando un archivo a la vez
  res.status(200).json({ message: cloudinaryFilePath });
};
