import * as React from 'react'

import { useKeycloak } from './useKeycloak'

import type { SSRAuthClient } from './types'

type InjectedProps<ACT> = {
  keycloakInitialized: boolean

  keycloak: ACT
}

/**
 * An HOC which injects the `keycloak` instance and the `keycloakInitialized` flag as props.
 *
 * @deprecated Please migrate to useKeycloak hook where/when possible.
 */
export function withKeycloak<
  P extends InjectedProps<ACT>,
  ACT extends SSRAuthClient = SSRAuthClient
>(
  Component: React.ComponentType<P>
): React.FC<Subtract<P, InjectedProps<ACT>>> {
  return function WrappedComponent(props: P) {
    const { keycloak, initialized } = useKeycloak()

    return (
      <Component
        {...(props as P)}
        keycloakInitialized={initialized}
        keycloak={keycloak}
      />
    )
  }
}

/*
 * Utility-types ported from https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts
 */

/**
 * SetDifference (same as Exclude)
 * @desc Set difference of given union types `A` and `B`
 * @example
 *   // Expect: "1"
 *   SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
 *
 *   // Expect: string | number
 *   SetDifference<string | number | (() => void), Function>;
 */
type SetDifference<A, B> = A extends B ? never : A

/**
 * SetComplement
 * @desc Set complement of given union types `A` and (it's subset) `A1`
 * @example
 *   // Expect: "1"
 *   SetComplement<'1' | '2' | '3', '2' | '3'>;
 */
type SetComplement<A, A1 extends A> = SetDifference<A, A1>

/**
 * Subtract
 * @desc From `T` remove properties that exist in `T1` (`T1` has a subset of the properties of `T`)
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type RestProps = Subtract<Props, DefaultProps>;
 */
type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>
