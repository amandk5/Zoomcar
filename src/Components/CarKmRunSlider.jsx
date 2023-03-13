import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CarKmRunSlider({
  defaultValue,
  handleCarKmsRunSlider,
}) {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  useEffect(() => {
    handleCarKmsRunSlider(sliderValue);
  }, [sliderValue]);

  return (
    <Box p="2">
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => setSliderValue(val)}
        defaultValue={sliderValue}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} borderRadius="-0.5rem" boxShadow="lg">
          <Box fontSize="13px">{sliderValue}</Box>
        </SliderThumb>
      </Slider>
    </Box>
  );
}
