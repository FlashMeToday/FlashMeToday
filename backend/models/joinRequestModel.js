const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    nearbyCities: {
        type: String,
        trim: true
    },
    portfolioLink: {
        type: String,
        trim: true
    },
    socialPage: {
        type: String,
        trim: true
    },
    selectedSkills: {
        type: [String],
        default: []
    },
    isMobileContentCreator: {
        type: Boolean,
        default: false
    },
    photographerCategories: {
        type: [String],
        default: []
    },
    photographerCameras: {
        type: String,
        trim: true
    },
    photographerEquipments: {
        type: String,
        trim: true
    },
    photographerSkillLevel: {
        type: String,
        trim: true
    },
    photographerExperience: {
        type: String,
        trim: true
    },
    photoEditorCategories: {
        type: [String],
        default: []
    },
    photoEditorSoftwares: {
        type: String,
        trim: true
    },
    videographerCategories: {
        type: [String],
        default: []
    },
    videographerCameras: {
        type: String,
        trim: true
    },
    videographerEquipments: {
        type: String,
        trim: true
    },
    videographerSoftwares: {
        type: String,
        trim: true
    },
    videographerSkillLevel: {
        type: String,
        trim: true
    },
    videographerExperience: {
        type: String,
        trim: true
    },
    videoEditorCategories: {
        type: [String],
        default: []
    },
    videoEditorSoftwares: {
        type: String,
        trim: true
    },
    uploadedPhotos: {
        type: [String],
        default: []
    },
    isRead: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const JoinRequest = mongoose.model('JoinRequest', joinRequestSchema);

module.exports = JoinRequest;
