import {
    Location,
    createLocation,
    LocationDescriptor,
    LocationDescriptorObject
} from 'history'

export const resolveToLocation = (
    to: LocationDescriptor | ((location: Location) => LocationDescriptor),
    currentLocation: Location
): LocationDescriptor => {
    return typeof to === 'function' ? to(currentLocation) : to
}

export const normalizeToLocation = (
    to: LocationDescriptor,
    currentLocation: Location
): LocationDescriptorObject => {
    return typeof to === 'string'
        ? createLocation(to, null, null, currentLocation)
        : to
}
