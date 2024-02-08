import { PulseLoader } from "react-spinners";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.ts";

const FallbackLoading = () => {
    const fullConfig = resolveConfig(tailwindConfig);

    const color = fullConfig.theme.colors["medium-purple"];
    return (
        <div className="flex h-screen items-center justify-center">
            <PulseLoader color={color} />
        </div>
    );
};

export default FallbackLoading;
