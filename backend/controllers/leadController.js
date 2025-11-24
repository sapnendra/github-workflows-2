import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, projectType, budgetRange, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !projectType || !budgetRange || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create new lead
    const lead = await Lead.create({
      name,
      email,
      phone,
      projectType,
      budgetRange,
      message,
      statusHistory: [
        {
          status: 'pending',
          note: 'Lead submitted',
          updatedAt: new Date(),
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting lead',
      error: error.message,
    });
  }
};
