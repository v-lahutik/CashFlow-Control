import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName: {
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
    pass_changed_at: {
        type: Date,
    },
    register_at: {
        type: Date,
        default: Date.now,
    },
    is_activated: {
        type: Boolean,
        default: false,
    },
});

/* Middleware for hashing the password */
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.pass_changed_at = Date.now();
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare plain password with hashed value
userSchema.methods.comparePass = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

const User = model('User', userSchema);
export default User;
