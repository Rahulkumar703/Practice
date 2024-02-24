import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.'],
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please set your username.'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        trim: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "moderator"],
        default: "user"
    },
    problems: [
        {
            problemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'problem'
            }
            ,
            solutions: [
                {
                    code: String,
                    language: {
                        type: String,
                        enum: ["cpp", "java", "python", "Javascript"],
                        default: "cpp"
                    },
                    notes: [String]
                }
            ],
            solved: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User;