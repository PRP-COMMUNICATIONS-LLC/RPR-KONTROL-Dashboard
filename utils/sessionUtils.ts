

export const generateSessionId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 999) + 1; // 1 to 999
  const paddedNum = String(randomNum).padStart(3, '0');
  return `RPR-${year}-${paddedNum}-SESSION`;
};

export const generateProjectCode = (clientName: string, taskNumber: number): string => {
  const year = new Date().getFullYear();
  const paddedTaskNum = String(taskNumber).padStart(3, '0');
  return `${clientName.toUpperCase()}-${year}-${paddedTaskNum}-TASK`;
};

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

// New utility to format Google Drive links
export const formatDriveLink = (driveFileId: string | undefined): string | null => {
  if (!driveFileId) {
    return null;
  }
  // This is the canonical Google Drive view link format
  return `https://drive.google.com/file/d/${driveFileId}/view`;
};
