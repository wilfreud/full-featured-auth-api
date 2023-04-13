import { Severity, modelOptions, prop, pre, getModelForClass, DocumentType } from "@typegoose/typegoose"
import { nanoid } from 'nanoid'
import argon2 from "argon2"
// import bcrypt from 'bcrypt'
import loggerC from "../utils/logger"


@pre<User>("save", async function () {
    if (!this.isModified('password')) {
        return
    }

    // Hash using argon2
    const hash = await argon2.hash(this.password)

    // Hash using bcrypt
    // const hash = await bcrypt.hash(this.password, 30)


    this.password = hash

})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        // For the passwordResetCode that can be a string or null
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ required: true, unique: true, lowercase: true })
    email: string

    @prop({ required: true })
    firstName: string

    @prop({ required: true })
    lastName: string

    @prop({ required: true })
    password: string


    @prop({ required: true, default: () => nanoid() })
    verificationCode: string

    @prop()
    passwordResetCode: string | null

    @prop({ default: false })
    verified: boolean

    async verifyPassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword)

            // Comparison but with bcrypt
            // return  await bcrypt.compare(this.password, candidatePassword)
        } catch (e) {
            loggerC.error(e, "Could not verify password.")
            return false
        }
    }
}

const UserModel = getModelForClass(User)

export default UserModel