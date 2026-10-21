"use client";
import { useEffect, useRef } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  mountGradient,
  normalizeParams,
  staticFallbackCss,
} from "../lib/gradient-engine";
import type {
  GradientParams,
  MountedGradient,
  MountOptions,
} from "../lib/gradient-engine";

/** Two to six colours. Any CSS colour works, including `var(--token)`. */
export type GradientColors = [string, string, ...string[]];

/** Props every gradients.sh component accepts. Each one maps onto a GradientParams field. */
export interface GradientProps {
  /** Two to six colours: hex, oklch(), names or `var(--token)`. */
  colors?: GradientColors;
  /** Base colour under the gradient, same rules as `colors`. */
  background?: string;
  /** 0 to 2. How far the gradient travels per loop; 0 holds it still. */
  speed?: number;
  /** 4 to 30. The animation repeats exactly every loopSeconds. */
  loopSeconds?: number;
  /** 0.25 to 4. Noise frequency: higher means smaller shapes. */
  scale?: number;
  /** 0 to 1. Domain-warp strength. */
  warp?: number;
  /** 0 to 1. Film grain. */
  grain?: number;
  /** 0 to 1. Softness. */
  blur?: number;
  /** Integer seed for the noise field. */
  seed?: number;
  /** Ordered 4x4 Bayer dither. */
  dither?: Partial<GradientParams["dither"]>;
  /** 0 to 1 influence of the pointer and of scroll velocity. */
  interaction?: Partial<GradientParams["interaction"]>;
  /** Device pixel ratio cap for the canvas. Default 1.5. */
  maxDpr?: number;
  /** "respect" shows one still frame when the user prefers reduced motion. Default "respect". */
  reducedMotion?: MountOptions["reducedMotion"];
}

/** Separates gradient props from the element props a component passes through. */
export function splitGradientProps<T extends GradientProps>(props: T) {
  const {
    background,
    blur,
    colors,
    dither,
    grain,
    interaction,
    loopSeconds,
    maxDpr,
    reducedMotion,
    scale,
    seed,
    speed,
    warp,
    ...rest
  } = props;
  const gradient: GradientProps = {
    background,
    blur,
    colors,
    dither,
    grain,
    interaction,
    loopSeconds,
    maxDpr,
    reducedMotion,
    scale,
    seed,
    speed,
    warp,
  };
  return [gradient, rest] as const;
}

/** Fills unset props from a component's defaults and clamps everything to range. */
export function resolveGradientParams(
  defaults: GradientParams,
  props: GradientProps
): GradientParams {
  return normalizeParams({
    background: props.background ?? defaults.background,
    blur: props.blur ?? defaults.blur,
    colors: props.colors ?? defaults.colors,
    dither: {
      cell: props.dither?.cell ?? defaults.dither.cell,
      enabled: props.dither?.enabled ?? defaults.dither.enabled,
      levels: props.dither?.levels ?? defaults.dither.levels,
    },
    grain: props.grain ?? defaults.grain,
    interaction: {
      pointer: props.interaction?.pointer ?? defaults.interaction.pointer,
      scroll: props.interaction?.scroll ?? defaults.interaction.scroll,
    },
    kind: defaults.kind,
    loopSeconds: props.loopSeconds ?? defaults.loopSeconds,
    scale: props.scale ?? defaults.scale,
    seed: props.seed ?? defaults.seed,
    speed: props.speed ?? defaults.speed,
    warp: props.warp ?? defaults.warp,
  });
}

export interface GradientCanvasProps extends Omit<
  ComponentProps<"canvas">,
  "children"
> {
  params: GradientParams;
  maxDpr?: number;
  reducedMotion?: MountOptions["reducedMotion"];
}

/**
 * A canvas running one live gradient. It mounts once and forwards param
 * changes without remounting. Its CSS background is the static fallback, so
 * the server render, the first client frame and browsers without WebGL all
 * show the gradient's colours instead of an empty box.
 */
export function GradientCanvas({
  params,
  maxDpr,
  reducedMotion,
  style,
  ...rest
}: GradientCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mounted = useRef<MountedGradient | null>(null);
  const latest = useRef(params);
  // Inline arrays and objects change identity every render; compare values.
  const key = JSON.stringify(params);

  // Declared before the mount effect so a remount always sees current params.
  useEffect(() => {
    latest.current = params;
    mounted.current?.setParams(params);
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- keyed by value
  }, [key]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    const control = mountGradient(canvas, latest.current, {
      maxDpr,
      reducedMotion,
    });
    mounted.current = control;
    return () => {
      mounted.current = null;
      control.unmount();
    };
  }, [maxDpr, reducedMotion]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      data-gradient-kind={params.kind}
      style={{ background: staticFallbackCss(params), ...style }}
      {...rest}
    />
  );
}

export interface GradientBackgroundProps
  extends GradientProps, Omit<ComponentProps<"div">, keyof GradientProps> {
  children?: ReactNode;
}

/**
 * A box filled with a live gradient, with children layered on top. The six
 * background components are this with their own defaults.
 */
export function GradientBackground({
  defaults,
  className,
  children,
  canvasStyle,
  ...props
}: GradientBackgroundProps & {
  defaults: GradientParams;
  canvasStyle?: CSSProperties;
}) {
  const [gradient, rest] = splitGradientProps(props);
  const params = resolveGradientParams(defaults, gradient);
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      {...rest}
    >
      <GradientCanvas
        params={params}
        maxDpr={gradient.maxDpr}
        reducedMotion={gradient.reducedMotion}
        className="pointer-events-none absolute inset-0 -z-10 block size-full"
        style={canvasStyle}
      />
      {children}
    </div>
  );
}
