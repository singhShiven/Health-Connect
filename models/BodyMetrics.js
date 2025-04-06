const mongoose = require("mongoose");

const BodyMetricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Health_Connect", required: true },
  metrics: { type: Object, default: {} }
});

module.exports = mongoose.model("BodyMetrics", BodyMetricsSchema);