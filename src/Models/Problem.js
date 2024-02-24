import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter Question Title.'],
        lowercase: true,
        trim: true
    },
    statement: {
        type: String,
        required: [true, 'Please enter Problem Statement.'],
        lowercase: true,
        trim: true
    },
    week: {
        type: Number,
        required: [true, 'Please enter Week Number.'],
        trim: true
    },
    companies: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    topics: [{
        type: String,
        required: [true, 'Please enter the topic of problem.'],
        lowercase: true,
        trim: true
    }],
    link: {
        type: Number,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
        lowercase: true,
        trim: true
    },
    solutions: [
        {
            type: {
                code: String,
                language: {
                    type: String,
                    enum: ["cpp", "java", "python", "javascript"],
                    default: "cpp",
                    lowercase: true,
                    trim: true
                },
                notes: [String],
                solver: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                }
            },
            select: false,
        }
    ]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Problem = mongoose.models.problem || mongoose.model('problem', ProblemSchema);
export default Problem;