import { Hospital } from '../types';

const API_ENDPOINT = 'http://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList';
// This is a public, sample API key provided by data.go.kr for testing purposes.
const API_KEY = '52e0733885b14ed85791d4f6d932fc39a13b4637a55027a8ea2a0de72cc24bdb';

// Helper function to extract text content from an XML element
const getElementText = (element: Element, tagName: string): string => {
  const node = element.querySelector(tagName);
  return node?.textContent || '';
};

export const fetchHospitals = async (
  latitude: number = 37.6132113197367, // Default to Seoul
  longitude: number = 127.09854004628151,
  radius: number = 3000 // 3km
): Promise<Hospital[]> => {
  // The API requires the 'ServiceKey' parameter with a capital K.
  const params = new URLSearchParams({
    ServiceKey: API_KEY,
    pageNo: '1',
    numOfRows: '50',
    xPos: longitude.toString(),
    yPos: latitude.toString(),
    radius: radius.toString(),
  });

  const apiUrl = `${API_ENDPOINT}?${params.toString()}`;

  // Use a CORS proxy to bypass browser cross-origin restrictions.
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`API call via proxy failed with status: ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const errorNode = xmlDoc.querySelector('resultCode');
    if (errorNode && errorNode.textContent !== '00') {
      const errorMsg = xmlDoc.querySelector('resultMsg')?.textContent || 'Unknown API error';
      throw new Error(`API Error: ${errorMsg} (Code: ${errorNode.textContent})`);
    }

    const items = xmlDoc.querySelectorAll('item');
    const hospitals: Hospital[] = Array.from(items).map(item => ({
      dutyName: getElementText(item, 'yadmNm'),
      dutyAddr: getElementText(item, 'addr'),
      dutyTel1: getElementText(item, 'telno'),
      distance: parseFloat(getElementText(item, 'distance')),
    }));

    return hospitals;
  } catch (error) {
    console.error("Failed to fetch hospitals:", error);
    // Re-throw the error so the UI component can catch it and display a helpful message.
    throw error;
  }
};