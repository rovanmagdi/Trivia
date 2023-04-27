import { Typography, Stack } from "@mui/material";

import { ContainerInterface } from "../types/container";
import { toastError } from "../errors/helper";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const ContainerSound = ({ children, sound }: ContainerInterface) => {
  const handleSound = (word: string) => {
    if ("speechSynthesis" in window) {
      let speech = new SpeechSynthesisUtterance();
      speech.text = word;
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      toastError("browser not support");
    }
  };

  return (
    <Stack
      gap={{ md: 1, xs: 5 }}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        align="center"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#007968",
        }}
      >
        {children?.toString().charAt(0).toUpperCase() +
          children?.toString().slice(1).toLowerCase()}
      </Typography>

      {!sound && (
        <Stack alignItems="center">
          <VolumeUpIcon
            onClick={() => handleSound(children.toString())}
            sx={{
              fontSize: "1.9rem",
              "&:hover": {
                color: "#FF7332",
              },
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ContainerSound;
