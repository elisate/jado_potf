import { AppDataSource } from "../config/db";
import bcrypt from "bcrypt";
import { UserRole } from "../entities/User";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established for seeding");

    const organizationRepository = AppDataSource.getRepository("Organization");
    const employeeRepository = AppDataSource.getRepository("Employee");
    const userRepository = AppDataSource.getRepository("User");
    const rnrsAccountRepository = AppDataSource.getRepository("RNRSAccount");

    // Create sample organization
    const organization = organizationRepository.create({
      name: "Tech Solutions Ltd",
      registrationNumber: "REG123456",
      address: "Kigali, Rwanda",
      contactEmail: "hr@techsolutions.rw",
      contactPhone: "+250788123456",
      contractSigned: true,
      contractSignedDate: new Date(),
      loanEligible: true,
    });

    const savedOrganization = await organizationRepository.save(organization);

    // Create sample employees
    const employees = [
      {
        rnrsId: "RNRS001",
        fullName: "John Doe",
        gender: "Male",
        nationality: "Rwandan",
        nationalId: "1234567890123456",
        phone: "+250788111111",
        email: "john.doe@techsolutions.rw",
        department: "Engineering",
        monthlySalary: 500000,
        employmentStatus: "active",
        startDate: new Date("2023-01-15"),
        bankName: "Bank of Kigali",
        bankAccountNumber: "BK123456789",
        bankAccountName: "John Doe",
        organizationId: savedOrganization.id,
      },
      {
        rnrsId: "RNRS002",
        fullName: "Jane Smith",
        gender: "Female",
        nationality: "Rwandan",
        nationalId: "1234567890123457",
        phone: "+250788222222",
        email: "jane.smith@techsolutions.rw",
        department: "Marketing",
        monthlySalary: 400000,
        employmentStatus: "active",
        startDate: new Date("2023-02-01"),
        bankName: "Equity Bank Rwanda",
        bankAccountNumber: "EQ987654321",
        bankAccountName: "Jane Smith",
        organizationId: savedOrganization.id,
      },
    ];

    const savedEmployees = [];
    for (const employeeData of employees) {
      const employee = employeeRepository.create(employeeData);
      const savedEmployee = await employeeRepository.save(employee);
      savedEmployees.push(savedEmployee);
    }

    // Create users with different roles
    const hashedPassword = await bcrypt.hash("password123", 12);

    const users = [
      {
        username: "agent001",
        email: "agent@rnrs.rw",
        password: hashedPassword,
        fullName: "Agent Smith",
        role: UserRole.AGENT,
        agentCode: "AGT001",
      },
      {
        username: "admin001",
        email: "admin@techsolutions.rw",
        password: hashedPassword,
        fullName: "Admin User",
        role: UserRole.ORGANIZATION_ADMIN,
        organizationId: savedOrganization.id,
      },
      {
        username: "john.doe",
        email: "john.doe@techsolutions.rw",
        password: hashedPassword,
        fullName: "John Doe",
        role: UserRole.EMPLOYEE,
        employeeId: savedEmployees[0].id,
        organizationId: savedOrganization.id,
      },
      {
        username: "jane.smith",
        email: "jane.smith@techsolutions.rw",
        password: hashedPassword,
        fullName: "Jane Smith",
        role: UserRole.EMPLOYEE,
        employeeId: savedEmployees[1].id,
        organizationId: savedOrganization.id,
      },
      {
        username: "superadmin",
        email: "superadmin@rnrs.rw",
        password: hashedPassword,
        fullName: "Super Admin",
        role: UserRole.SUPER_ADMIN,
      },
    ];

    for (const userData of users) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
    }

    // Create RNRS accounts
    const rnrsAccounts = [
      {
        accountName: "RNRS Main Account",
        accountNumber: "RNRS001MAIN",
        bankName: "Bank of Kigali",
        balance: 10000000,
        accountType: "main",
      },
      {
        accountName: "RNRS Savings Account",
        accountNumber: "RNRS001SAVINGS",
        bankName: "Bank of Kigali",
        balance: 5000000,
        accountType: "savings",
      },
      {
        accountName: "RNRS RSSB Account",
        accountNumber: "RNRS001RSSB",
        bankName: "Bank of Kigali",
        balance: 2000000,
        accountType: "rssb",
      },
    ];

    for (const accountData of rnrsAccounts) {
      const account = rnrsAccountRepository.create(accountData);
      await rnrsAccountRepository.save(account);
    }

    console.log("Database seeded successfully!");
    console.log("\nDefault Users Created:");
    console.log("Agent: username=agent001, password=password123");
    console.log("Organization Admin: username=admin001, password=password123");
    console.log("Employee 1: username=john.doe, password=password123");
    console.log("Employee 2: username=jane.smith, password=password123");
    console.log("Super Admin: username=superadmin, password=password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
