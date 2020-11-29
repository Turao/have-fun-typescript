export interface FeatureToggleOptions {
  enabled: boolean;
}

export function FeatureToggle(options: FeatureToggleOptions) {
  return function (
    target: any,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    if (!options.enabled) {
      descriptor.value = () => {
        console.log(
          `Feature[${key.toString()}] has been disabled (but was called)`
        );
      };
    }
    return descriptor;
  };
}
