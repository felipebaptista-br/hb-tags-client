/** Builds nested profile_data for activation from the simplified form. */

export function buildProfileData(input: {
  categorySlug: string
  displayName: string
  age?: string
  allergy?: string
  contactName: string
  contactPhone: string
  extraNote?: string
}): Record<string, unknown> {
  const profile: Record<string, unknown> = {
    identity: {
      display_name: input.displayName.trim(),
    },
    contacts: [
      {
        name: input.contactName.trim(),
        phone: input.contactPhone.trim(),
      },
    ],
  }

  if (input.categorySlug === "elderly") {
    if (input.age) {
      ;(profile.identity as Record<string, unknown>).age_range = input.age
    }
    if (input.allergy?.trim()) {
      profile.health = { allergies: [input.allergy.trim()] }
    }
  }

  if (input.categorySlug === "pet" && input.extraNote?.trim()) {
    profile.extra = { notes: input.extraNote.trim() }
  }

  if (input.categorySlug === "neurodivergent" && input.extraNote?.trim()) {
    profile.instructions = { how_to_help: input.extraNote.trim() }
  }

  return profile
}
