import cron from "node-cron";
import Customer from "../models/Customer.js";

export const startInactiveCustomerJob = () => {
  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const cutoffDate = new Date(Date.now() - THIRTY_DAYS);

    try {
      const result = await Customer.updateMany(
        { lastActiveAt: { $lt: cutoffDate } },
        { $set: { status: "inactive" } }
      );

      console.log(`✅ Inactive customer job ran. Updated ${result.modifiedCount} customers.`);
    } catch (err) {
      console.error("❌ Error running inactive customer job:", err.message);
    }
  });
};
