const {
  Service
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

const getServices = asyncHandler(async (req, res) => {
  const where = req.query.all === 'true' ? {} : {
    active: true
  };
  const services = await Service.findAll({
    where,
    order: [
      ['id', 'ASC']
    ]
  });
  res.json({
    success: true,
    services
  });
});

const getService = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json({ success: true, service });
});

const createService = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  if (req.file) data.icon = `publicPath(req, req.file)`;
  const service = await Service.create(data);
  res.status(201).json({
    success: true,
    message: 'Service created',
    service
  });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  const data = {
    ...req.body
  };
  if (req.file) data.icon = `publicPath(req, req.file)`;
  await service.update(data);
  res.json({
    success: true,
    message: 'Service updated',
    service
  });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  await service.destroy();
  res.json({
    success: true,
    message: 'Service deleted'
  });
});

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};