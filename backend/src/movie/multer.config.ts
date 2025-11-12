import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `movie-${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
            return cb(
                new BadRequestException('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'),
                false
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
};
