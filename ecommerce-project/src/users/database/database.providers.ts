/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://abdulsamea2003:Abdo2003@cluster0.29zqtlv.mongodb.net/test',
      ), 
  },
]
