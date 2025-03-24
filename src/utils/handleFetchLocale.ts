import type { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import formatCrowdinResponse from './formatCrowdinResponse';
import mergeDeep from './mergeDeep';

export default async function handleFetchLocale(
  ctx: RenderItemFormSidebarPanelCtx,
  sourceLocale: Array<string>
) {
  // Check if item or item.id is missing
  if (!ctx.item || !ctx.item.id) {
    console.error('Cannot fetch locale: Item or item ID is missing');
    return;
  }

  const fileIDResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${
        ctx.plugin.attributes.parameters.crowdinProjectId
      }/files?filter=record${ctx.item.id}Source`,
      {
        headers: {
          Authorization: `Bearer ${ctx.plugin.attributes.parameters.crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json();

  // Check if the API returned the expected data structure
  if (!fileIDResponse.data || !fileIDResponse.data[0] || !fileIDResponse.data[0].data || !fileIDResponse.data[0].data.id) {
    console.error('Cannot fetch locale: Invalid fileID response', fileIDResponse);
    return;
  }

  const fileID = fileIDResponse.data[0].data.id;

  const translationResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${ctx.plugin.attributes.parameters.crowdinProjectId}/translations/builds/files/${fileID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ctx.plugin.attributes.parameters.crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetLanguageId: ctx.locale,
        }),
      }
    )
  ).json();

  // Check if the API returned the expected data structure
  if (!translationResponse.data || !translationResponse.data.url) {
    console.error('Cannot fetch locale: Invalid translation response', translationResponse);
    return;
  }

  const { data: { url } } = translationResponse;

  const translatedRecord = await (await fetch(url)).json();

  const formatedResponse: Record<string, unknown> = formatCrowdinResponse(
    translatedRecord,
    sourceLocale[0],
    ctx.locale
  );

  try {
    const mergedRecord = mergeDeep(
      ctx.formValues || {},
      formatedResponse
    );
    
    // Create a new object without the internal property
    const newRecordObject: Record<string, unknown> = {};
    for (const field in mergedRecord) {
      if (Object.prototype.hasOwnProperty.call(mergedRecord, field) && field !== 'internalLocales') {
        newRecordObject[field] = mergedRecord[field];
      }
    }

    // Update each field in the form
    for (const field in newRecordObject) {
      if (Object.prototype.hasOwnProperty.call(newRecordObject, field)) {
        ctx.setFieldValue(field, newRecordObject[field]);
      }
    }
  } catch (error) {
    // setFieldValue doesn't seem to throw errors
    console.error('Error updating fields:', error);
  }
}
