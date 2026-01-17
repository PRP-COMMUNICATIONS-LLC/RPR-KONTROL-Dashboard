
import { SessionSchema, Artifact } from '../types';

/**
 * Generates a JSON string of metadata for a new session artifact.
 * This metadata includes critical session context for audit trails and external mirroring.
 *
 * @param session The current `SessionSchema` object.
 * @param artifact The `Artifact` object representing the item to be saved.
 * @returns A JSON string representing the artifact's metadata.
 */
export const generateArtifactMetadata = (session: SessionSchema, artifact: Artifact): string => {
  return JSON.stringify({
    artifact_metadata: {
      filename: artifact.title, // Using artifact.title as per existing Artifact interface
      drive_path: artifact.drivePath || "N/A", // Use drivePath, default to N/A if not set
      purpose: "Statutory validation / Forensic artifact",
      related_session: session.sessionId,
      agents_involved: session.agentsInvolved,
      classification: session.classification,
      version_authority: "RPR-KONTROL v1.0",
      generated_at: new Date().toISOString(), // New: Add generation timestamp
    }
  }, null, 2);
};
