import cron from "node-cron";
import  PaymentService  from "./PaymentService.js";

class SchedulerService {
  constructor() {
    this.paymentService = new PaymentService();
  }

  startScheduledTasks() {
    // Schedule monthly payments on the 21st of every month at 9:00 AM
    cron.schedule(
      "0 9 21 * *",
      async () => {
        console.log("Running scheduled monthly payment processing...");
        try {
          await this.paymentService.processMonthlyPayments();
          console.log("Scheduled payment processing completed successfully");
        } catch (error) {
          console.error("Error in scheduled payment processing:", error);
        }
      },
      {
        timezone: "Africa/Kigali",
      }
    );

    // Schedule daily check for failed payments (retry mechanism)
    cron.schedule(
      "0 10 * * *",
      async () => {
        console.log("Running daily failed payment retry...");
        try {
          await this.retryFailedPayments();
        } catch (error) {
          console.error("Error in failed payment retry:", error);
        }
      },
      {
        timezone: "Africa/Kigali",
      }
    );

    console.log("Payment scheduler started successfully");
  }

  async retryFailedPayments() {
    // Implementation for retrying failed payments
    console.log("Checking for failed payments to retry...");
    // This would query for failed payments and attempt to reprocess them
  }

  // Manual trigger for testing
  async triggerMonthlyPayments() {
    console.log("Manually triggering monthly payment processing...");
    await this.paymentService.processMonthlyPayments();
  }
}

export default SchedulerService;
