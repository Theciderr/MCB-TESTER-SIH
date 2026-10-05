import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mCBModel.createMany({
    data: [
      { manufacturer: "Schneider Electric", modelName: "Acti9 iC60N", ratedCurrentA: 16, curveType: "C", poles: 2, ratedVoltageV: 240 },
      { manufacturer: "ABB", modelName: "S200M", ratedCurrentA: 20, curveType: "B", poles: 2, ratedVoltageV: 240 },
      { manufacturer: "Siemens", modelName: "5SL6", ratedCurrentA: 32, curveType: "D", poles: 2, ratedVoltageV: 240 },
    ],
  });
}

main().finally(() => prisma.$disconnect());