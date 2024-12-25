import z from 'zod';

type DocumentPage = {
  pageId: string;
  url: string;
  pageNumber: number;
  orientation: number;
  comments: any[];
};
type DocumentVersion = {
  uploadedBy: string;
  uploaded: string;
  version: number;
  numberOfPages: number;
  pages: DocumentPage[];
};

type CaseDocument = {
  documentId: string;
  title: string;
  referenceNumber: string;
  documentTypeId: string;
  numberOfVersions: number;
  numberOfPageComments: number;
  numberOfPages: number;
  currentVersion: DocumentVersion;
};

export default async function getDocuments({
  token,
  jobNumber,
}: {
  token: string;
  jobNumber: number;
}): Promise<CaseDocument[]> {
  let req = await fetch('https://devtoken.neoma.co.uk/Document/GetDocuments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      documentTypeId: '',
      jobNumber: jobNumber, //2001866,
      searchText: '',
      documentId: '',
    }),
  });

  let data = await req.json();
  return data as CaseDocument[];
}
