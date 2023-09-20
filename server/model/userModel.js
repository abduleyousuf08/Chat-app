import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },

      email: {
         type: String,
         required: true,
         unique: true,
      },

      password: {
         type: String,
         required: true,
      },
      bio: {
         type: String,
         default: 'Iam using TalkWave',
      },
      profile: {
         type: String,
         default:
            'data:image/png;base64,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',
      },
   },
   {
      timestamps: true,
   }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
