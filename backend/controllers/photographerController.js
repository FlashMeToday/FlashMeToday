const Photographer = require('../models/photographerModel');
const { cloudinary, getPublicIdFromUrl } = require('../middleware/uploadMiddleware');

// @desc    Add new photographer
// @route   POST /api/photographers
// @access  Private/Admin
const addPhotographer = async (req, res) => {
  try {
    const {
      fullName, mobile, email, address, city, state, country,
      nearbyCities, status, experience, expertise, equipment
    } = req.body;

    let profileImage = '';
    if (req.file && req.file.path) {
      profileImage = req.file.path; // Cloudinary URL
    }

    const photographer = await Photographer.create({
      profileImage,
      fullName,
      mobile,
      email,
      address,
      city,
      state,
      country: country || 'India',
      nearbyCities: nearbyCities ? JSON.parse(nearbyCities) : [],
      status: status || 'Available',
      experience,
      expertise,
      equipment
    });

    res.status(201).json({
      success: true,
      data: photographer
    });
  } catch (error) {
    console.error('Error adding photographer:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all photographers (with infinite scroll / pagination)
// @route   GET /api/photographers
// @access  Private/Admin
const getPhotographers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9; // 9 cards per page for 3-col grid
    const startIndex = (page - 1) * limit;

    // Search & Filters
    const { search, state, status, expertise } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (state) {
      query.state = state;
    }

    if (status) {
      query.status = status;
    }

    if (expertise) {
      query.expertise = { $regex: expertise, $options: 'i' };
    }

    const [total, photographers] = await Promise.all([
      Photographer.countDocuments(query),
      Photographer.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .lean()
    ]);

    res.status(200).json({
      success: true,
      count: photographers.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: photographers
    });
  } catch (error) {
    console.error('Error fetching photographers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update a photographer
// @route   PUT /api/photographers/:id
// @access  Private/Admin
const updatePhotographer = async (req, res) => {
  try {
    let photographer = await Photographer.findById(req.params.id);

    if (!photographer) {
      return res.status(404).json({ success: false, message: 'Photographer not found' });
    }

    const updateData = { ...req.body };
    
    // Handle nearbyCities if sent as stringified JSON
    if (updateData.nearbyCities && typeof updateData.nearbyCities === 'string') {
      try {
        updateData.nearbyCities = JSON.parse(updateData.nearbyCities);
      } catch (e) {
        // If it's a simple string, wrap in array or ignore
      }
    }

    if (req.file && req.file.path) {
      updateData.profileImage = req.file.path;
    }

    photographer = await Photographer.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: photographer
    });
  } catch (error) {
    console.error('Error updating photographer:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a photographer
// @route   DELETE /api/photographers/:id
// @access  Private/Admin
const deletePhotographer = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);

    if (!photographer) {
      return res.status(404).json({ success: false, message: 'Photographer not found' });
    }

    if (photographer.profileImage) {
      const publicId = getPublicIdFromUrl(photographer.profileImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudErr) {
          console.error('Error deleting from Cloudinary:', cloudErr);
        }
      }
    }

    await photographer.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting photographer:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  addPhotographer,
  getPhotographers,
  updatePhotographer,
  deletePhotographer
};
