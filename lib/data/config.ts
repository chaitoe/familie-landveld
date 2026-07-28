import { EventTypeDef, CustomFieldDef } from '@/lib/types';
import eventTypesData from '@/data/config/event-types.json';
import customFieldsData from '@/data/config/custom-fields.json';

export function getEventTypes(): EventTypeDef[] {
  return eventTypesData.eventTypes as EventTypeDef[];
}

export function getEventType(key: string): EventTypeDef | undefined {
  return (eventTypesData.eventTypes as EventTypeDef[]).find(e => e.key === key);
}

export function getCustomFieldDefs(): CustomFieldDef[] {
  return customFieldsData.fields as CustomFieldDef[];
}

export function getCustomFieldDef(key: string): CustomFieldDef | undefined {
  return (customFieldsData.fields as CustomFieldDef[]).find(f => f.key === key);
}
