export default class Backend {
  // For 'Performance data' section in the sidebar
  static performanceDataJson() {
    const dataOptions = {
      categories: {
        devicePerformance: {
          drawCalls: true,
          fps: true,
          cpuUsage: true,
          batteryUsage: true,
        },

        resourceSize: {
          gameSizeTotal: true,
          totalPixelsCount: true,
          totalSoundLength: true,
          otherResources: true,
        },

        memoryUsage: {
          memoryUsageTotal: true,
          graphicMemory: true,
          soundsMemory: true,
          topbarNativeApp: true
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

        // Based on platform - platform -> phone
      case 'device':
        data = ['iphone5', 'iphone6', 'iphone7', 'iphone8'];
        break;

        // Based on platform - platform -> phone
        // Based on device - device -> iPhone 7
      case 'game':
        data = {
          PaddyPowerGold: 255,
          RubyWalsh: 133,
          TumbleDwarf: 75
        };
        break;

        // Based on platform - platform -> phone
        // Based on device - device -> iPhone 7
        // Based on game - game -> game_id
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
    /**
     * Send formData
     * @example
     * platform = 'html5',
     * device = 'iPhone7',
     * gameId = 155,
     * buildId = 13
     */

    const json = {
      id: 17,
      gameName: 'Keeping Up With The Paddys',
      device: 'iPhone 7',
      build: '12/08/16 09:52:11 - 33fcc92',
      color: 'pink',
      categories: {
        devicePerformance: {
          drawCalls: 155,
          fps: 60,
          cpuUsage: 25,
          batteryUsage: 5,
        },

        resourceSize: {
          gameSizeTotal: 200,
          totalPixelsCount: 145000,
          totalSoundLength: 15,
          otherResources: 50,
        },

        memoryUsage: {
          memoryUsageTotal: 2,
          graphicMemory: 1,
          soundsMemory: 500,
          topbarNativeApp: 500
        }
      }
    };

    return json;
  }
}