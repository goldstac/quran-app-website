"use client";
import { kindDefaults } from "../lib/gradient-engine";
import type { GradientParams } from "../lib/gradient-engine";
import { GradientBackground } from "./gradient-surface";
import type { GradientBackgroundProps } from "./gradient-surface";

/** Soft colour blobs drifting into each other, as a live background. */
export const meshGradientDefaults: GradientParams = kindDefaults("mesh");

export type MeshGradientProps = GradientBackgroundProps;

export function MeshGradient(props: MeshGradientProps) {
  return <GradientBackground defaults={meshGradientDefaults} {...props} />;
}
