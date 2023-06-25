import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import formatCrowdinResponse from './formatCrowdinResponse';
import mergeDeep from './mergeDeep';

export default async function handleFetchLocale(
  ctx: RenderItemFormSidebarPanelCtx,
  sourceLocale: Array<string>
) {
  const fileIDResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${
        ctx.plugin.attributes.parameters.crowdinProjectId
      }/files?filter=record${ctx.item!.id}Source`,
      {
        headers: {
          Authorization: `Bearer ${ctx.plugin.attributes.parameters.crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json();

  const fileID = fileIDResponse.data[0].data.id;

  const {
    data: { url },
  } = await (
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

  const translatedRecord = await (await fetch(url)).json();

  const formatedResponse: any = formatCrowdinResponse(
    translatedRecord,
    sourceLocale[0],
    ctx.locale
  );

  try {
    const newRecordObject = mergeDeep(ctx.formValues, formatedResponse);
    delete newRecordObject.internalLocales;

    for (const field in newRecordObject) {
      ctx.setFieldValue(field, newRecordObject[field]);
    }
  } catch (error) {
    // setFieldValue doesn't seem to throw errors
    console.log(error);
  }
}
