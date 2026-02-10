import { Config } from '@remotion/cli/config';

// Set default video image format
Config.setVideoImageFormat('jpeg');
// Set default still image format
Config.setStillImageFormat('png');
// Overwrite output file if it exists
Config.setOverwriteOutput(true);