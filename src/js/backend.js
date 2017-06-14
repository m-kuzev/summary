export default class Backend {
  // For 'Performance data' section in the sidebar
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

  static getOptions(type) {
    if (type.indexOf('-') !== -1) {
      type = type.replace('#', '');
      type = type.replace('-select', '');
    }

    let data = {};
    switch (type) {
      case 'platform':
        data = ['-', 'html5', 'tablet', 'phone'];
        break;

      case 'device':
        data = ['iphone5', 'iphone6', 'iphone7', 'iphone8'];
        break;

      case 'game':
        data = {
          PaddyPowerGold: 255,
          RubyWalsh: 133,
          TumbleDwarf: 75
        };
        break;

      case 'build':
        data = {
          '45645675467-build': 13,
          '546546546-build': 15,
          '879878979-build': 18
        };
        break;
    }

    return data;
  }

  static entryJson() {
    const json = {};

    return json;
  }
}