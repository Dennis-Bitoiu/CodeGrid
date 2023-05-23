import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    submissions: {
      type: [
        {
          problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
            required: true,
          },

          code: {
            type: String,
            required: true,
          },

          result: {
            type: String,
            enum: [
              'Accepted',
              'Wrong Answer',
              'Time Limit Exceeded',
              'Runtime Error',
              'Compilation Error',
            ],
            default: 'Wrong Answer',
          },

          submittedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
