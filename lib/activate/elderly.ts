export type ElderlyGroup = "identity" | "health" | "extra" | "contacts" | "instructions"

export type ElderlyVisibility = "public" | "restricted" | "private"

export type ElderlyFieldType =
  | "text"
  | "image"
  | "enum"
  | "bool"
  | "date"
  | "text_list"
  | "enum_multi"
  | "medications"
  | "contacts"
  | "textarea"

export type ElderlyOption = {
  value: string
  label: string
}

export type ElderlyField = {
  key: string
  label: string
  type: ElderlyFieldType
  required: boolean
  group: ElderlyGroup
  visibility: ElderlyVisibility
  hint?: string
  maxLength?: number
  minItems?: number
  options?: ElderlyOption[]
}

const ageRanges: ElderlyOption[] = [
  { value: "0-12", label: "0 a 12 anos" },
  { value: "13-17", label: "13 a 17 anos" },
  { value: "18-59", label: "18 a 59 anos" },
  { value: "60-69", label: "60 a 69 anos" },
  { value: "70-79", label: "70 a 79 anos" },
  { value: "80+", label: "80 anos ou mais" },
]

const languages: ElderlyOption[] = [
  { value: "pt-BR", label: "Português" },
  { value: "en", label: "Inglês" },
  { value: "es", label: "Espanhol" },
]

const bloodTypes: ElderlyOption[] = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "unknown", label: "Não sei" },
]

const criticalAlerts: ElderlyOption[] = [
  { value: "uses_anticoagulant", label: "Usa anticoagulante" },
  { value: "uses_insulin", label: "Usa insulina" },
  { value: "has_pacemaker", label: "Tem marca-passo" },
  { value: "epilepsy", label: "Epilepsia" },
]

const cognitiveDiagnoses: ElderlyOption[] = [
  { value: "alzheimer", label: "Alzheimer" },
  { value: "dementia", label: "Demência" },
  { value: "other", label: "Outro" },
]

const mobilityAids: ElderlyOption[] = [
  { value: "wheelchair", label: "Cadeira de rodas" },
  { value: "walker", label: "Andador" },
  { value: "cane", label: "Bengala" },
]

const sensoryAids: ElderlyOption[] = [
  { value: "glasses", label: "Óculos" },
  { value: "hearing_aid", label: "Aparelho auditivo" },
  { value: "prosthesis", label: "Prótese" },
]

/** Espelho do fields_schema da categoria elderly em seed_categories.sql. */
export const elderlyFields: ElderlyField[] = [
  {
    key: "identity.display_name",
    label: "Como gosta de ser chamado(a)",
    type: "text",
    required: true,
    group: "identity",
    visibility: "public",
    maxLength: 60,
    hint: "Prefira apelido ou primeiro nome",
  },
  {
    key: "identity.photo_url",
    label: "Foto",
    type: "image",
    required: false,
    group: "identity",
    visibility: "public",
  },
  {
    key: "identity.age_range",
    label: "Faixa etária",
    type: "enum",
    required: true,
    group: "identity",
    visibility: "public",
    options: ageRanges,
  },
  {
    key: "identity.birth_date",
    label: "Data de nascimento",
    type: "date",
    required: false,
    group: "identity",
    visibility: "private",
  },
  {
    key: "identity.language",
    label: "Idioma",
    type: "enum",
    required: false,
    group: "identity",
    visibility: "public",
    options: languages,
  },
  {
    key: "health.blood_type",
    label: "Tipo sanguíneo",
    type: "enum",
    required: false,
    group: "health",
    visibility: "public",
    options: bloodTypes,
  },
  {
    key: "health.allergies",
    label: "Alergias",
    type: "text_list",
    required: true,
    group: "health",
    visibility: "public",
    hint: "Se não houver, informe \"nenhuma\"",
  },
  {
    key: "health.critical_alerts",
    label: "Alertas críticos",
    type: "enum_multi",
    required: false,
    group: "health",
    visibility: "public",
    options: criticalAlerts,
  },
  {
    key: "health.medications",
    label: "Medicamentos em uso",
    type: "medications",
    required: false,
    group: "health",
    visibility: "restricted",
  },
  {
    key: "health.conditions",
    label: "Condições de saúde",
    type: "text_list",
    required: false,
    group: "health",
    visibility: "restricted",
  },
  {
    key: "health.doctor",
    label: "Médico ou serviço de referência",
    type: "text",
    required: false,
    group: "health",
    visibility: "restricted",
  },
  {
    key: "health.health_plan.provider",
    label: "Plano de saúde (operadora)",
    type: "text",
    required: false,
    group: "health",
    visibility: "private",
  },
  {
    key: "health.health_plan.card_number",
    label: "Plano de saúde (carteirinha)",
    type: "text",
    required: false,
    group: "health",
    visibility: "private",
  },
  {
    key: "contacts",
    label: "Contatos de emergência",
    type: "contacts",
    required: true,
    group: "contacts",
    visibility: "public",
    minItems: 1,
    hint: "Cada contato será avisado de que foi cadastrado",
  },
  {
    key: "instructions.note",
    label: "Observação",
    type: "textarea",
    required: false,
    group: "instructions",
    visibility: "restricted",
    maxLength: 280,
    hint: "Não inclua dados desnecessários",
  },
  {
    key: "extra.may_get_disoriented",
    label: "Pode se desorientar ou se perder",
    type: "bool",
    required: false,
    group: "extra",
    visibility: "public",
  },
  {
    key: "extra.cognitive_diagnosis",
    label: "Diagnóstico cognitivo",
    type: "enum",
    required: false,
    group: "extra",
    visibility: "restricted",
    options: cognitiveDiagnoses,
    hint: "Opcional, por decisão do responsável",
  },
  {
    key: "extra.mobility_aids",
    label: "Apoios de mobilidade",
    type: "enum_multi",
    required: false,
    group: "extra",
    visibility: "public",
    options: mobilityAids,
  },
  {
    key: "extra.sensory_aids",
    label: "Óculos, aparelho auditivo ou prótese",
    type: "enum_multi",
    required: false,
    group: "extra",
    visibility: "public",
    options: sensoryAids,
  },
  {
    key: "extra.communication_tips",
    label: "Como se comunicar",
    type: "text",
    required: false,
    group: "extra",
    visibility: "restricted",
    maxLength: 140,
  },
  {
    key: "extra.home_city",
    label: "Cidade e bairro",
    type: "text",
    required: false,
    group: "extra",
    visibility: "restricted",
  },
  {
    key: "extra.home_address",
    label: "Endereço completo",
    type: "text",
    required: false,
    group: "extra",
    visibility: "private",
  },
]

export const visibilityCopy: Record<ElderlyVisibility, string> = {
  public: "Quem escanear vê",
  restricted: "Só aparece com confirmação",
  private: "Nunca aparece",
}

export function fieldsInGroup(group: ElderlyGroup): ElderlyField[] {
  return elderlyFields.filter((field) => field.group === group)
}
