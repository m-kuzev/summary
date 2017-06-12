export default class Backend {
  static performanceDataJson() {
    const dataOptions = {
      categories: {
        devicePerformance: {
          drawCalls: false,
          fps: false,
          cpuUsage: false,
          batteryUsage: false,
        },

        resourceSize: {
          gameSizeTotal: false,
          totalPixelsCount: false,
          totalSoundLength: false,
          otherResources: false,
        },

        memoryUsage: {
          memoryUsageTotal: false,
          graphicMemory: false,
          soundsMemory: false,
          topbarNativeApp: false
        }
      }
    };

    return dataOptions;
  }

}