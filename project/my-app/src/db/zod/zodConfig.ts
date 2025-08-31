import * as z from 'zod'
import { createErrorMap } from 'zod-validation-error'

// Anbefaler å bruke zod-validation-error sitt errorMap:contentReference[oaicite:6]{index=6}
z.config({
  // dette errorMap‑et kjøres når det ikke er definert en schema‑spesifikk eller per‑parse melding:contentReference[oaicite:7]{index=7}
  customError: createErrorMap({
    // opsjoner (f.eks. vis regex‑detaljer eller lokaliser tall/datoer)
    // displayInvalidFormatDetails: true,
  })
})
