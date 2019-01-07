import WaveCreator from "./WaveCreator";
import WaveRecorder from "./WaveRecorder";
import WaveParser from "./waveParse";
import WaveChanger from "./WaveChanger";

export default class Wave {
  public static Recorder(): WaveRecorder {
    return new WaveRecorder();
  }
  public static Creator(): WaveCreator {
    return new WaveCreator();
  }

  public static Parser(): WaveParser {
    return new WaveParser();
  }

  public static Changer(): WaveChanger {
    return new WaveChanger();
  }
}

interface waveFormat {
  chunk_type: string;
  chunk_size: number;
  format: string;
  subchunk_type: string;
  subchunk_size: number;
  sound_format: number;
  channels: number;
  sampling_rate: number;
  data_speed: number;
  sampling_block_bytes: number;
  sampling_bit: number;
  option_size: null;
  option_data: null;
  data_chunk: string;
  data_chunk_size: number;
}
