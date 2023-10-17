import { useCallback } from "react";
import Particles from "react-tsparticles";
import particlesCofig from "../../../constants/particles/config.json";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

function ParticlesBg() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesCofig as any}
    />
  );
}

export default ParticlesBg;
