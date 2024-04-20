const initial = [
  `
CREATE TABLE IF NOT EXISTS "Tasks" (
  "Id" INTEGER NOT NULL,
  "Title" TEXT NOT NULL,
  "Deadline" DATETIME NOT NULL,
  "Description"	TEXT NULL,
  "IsCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY("Id" AUTOINCREMENT)
);
  `,
  `
INSERT INTO "Tasks" (Title, Deadline, Description, IsCompleted)
VALUES
  ("Finish elevator pitch", "2023-11-23T18:00:00.000Z", "We need to create an elevator pitch for our product", FALSE),
  ("Implement high priority features", "2024-01-12T17:00:00.000Z", "We have high priority features that our product department is asking for", FALSE),
  ("Prepare for monthly status meeting", "2023-12-24T08:00:00.000Z", "We need to prepare for monthly status meeting", FALSE),
  ("Design Beyon Connect coding test", "2023-07-12T17:00:00.000Z", "We need to design a coding test for our new applicants", TRUE);
  `,
  `
CREATE TABLE IF NOT EXISTS "EncryptedNotes" (
  "Id" INTEGER NOT NULL,
  "UserId" TEXT NOT NULL,
  "EncryptedPayload TEXT NOT NULL",
  PRIMARY KEY("Id" AUTOINCREMENT)
);
  `,
];

export const migrations = [initial];
