const {
  Visitor
} = require('../models');

// Track public visitors (skip admin routes/assets)
const trackVisitor = async (req, res, next) => {
  try {
    if (req.path.startsWith('/api/admin') || req.path.startsWith('/uploads')) return next();
    if (req.method !== 'GET') return next();

    const ip = req.headers['x-forwarded-for'] ?.split(',')[0] ?.trim() || req.socket.remoteAddress;
    const ua = req.headers['user-agent'] || '';

    // simple dedupe: same IP within the last 30 min is not tracked again
    const recent = await Visitor.findOne({
      where: {
        ip_address: ip
      },
      order: [
        ['visited_at', 'DESC']
      ],
    });
    if (recent && Date.now() - new Date(recent.visited_at).getTime() < 30 * 60 * 1000) {
      return next();
    }

    const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    let browser = 'Unknown';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';
    let os = 'Unknown';
    if (/Windows/.test(ua)) os = 'Windows';
    else if (/Mac OS/.test(ua)) os = 'macOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iOS/.test(ua)) os = 'iOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    await Visitor.create({
      ip_address: ip,
      browser: `${browser}${isMobile ? ' (Mobile)' : ''}`,
      os
    });
  } catch (e) {
    // never block the request because of tracking
    console.error('[visitor]', e.message);
  }
  next();
};

module.exports = {
  trackVisitor
};