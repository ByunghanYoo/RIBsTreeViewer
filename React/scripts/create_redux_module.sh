
# Functions

function log1() {
  echo "$1"
}

function log2() {
  echo "\t$1"
}

function abort() {
  echo "❌ Aborted"
  echo "\t$2"
  exit $1
}

function generate_file() {
  if [[ -e $1 ]]; then
    abort 1 "[$1] already exists."
  fi

  touch $1
  log2 "[$1] is generated."
}

# Variables

module_name=$1
cap_module_name=$(echo $module_name | python -c "name = raw_input(); print(name[0].capitalize() + name[1:])" )
directory_path=src/modules/$module_name

# Create Directory

log1 "🗂  Create directory"

if [[ ! -e $directory_path ]]; then
  mkdir $directory_path
  log2 "[$directory_path] is created."
elif [[ ! -d $directory_path ]]; then
  abort 1 "[$directory_path] already exists, but is not a directory."
else
  abort 1 "[$directory_path] already exists, but is not a directory."
fi

# Generate Files

log1 "📝 Generate files"

# index.ts
index_file_path=$directory_path/index.ts
generate_file $index_file_path
cat >> $index_file_path <<EOL
export { default } from "./reducer";
export * from "./actions";
export * from "./types";
EOL

# actions.ts
actions_file_path=$directory_path/actions.ts
generate_file $actions_file_path
cat >> $actions_file_path <<EOL
import { createAction } from "typesafe-actions";
import { SomePayload } from "./types";

// Action Types

export const DO_SOMETING = "$module_name/DO_SOMETING";

// Action Creators

export const doSomething = createAction(DO_SOMETING)<SomePayload>();
EOL

# types.ts
types_file_path=$directory_path/types.ts
action_type="$cap_module_name"Action
state_type="$cap_module_name"State

generate_file $types_file_path
cat >> $types_file_path <<EOL
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Payloads

export interface SomePayload {
  someString: string;
}

// Actions

export type $action_type = ActionType<typeof actions>;

// State

export interface $state_type {}
EOL

# reducer.ts
reducer_file_path=$directory_path/reducer.ts
reducer_name="$module_name"Reducer

generate_file $reducer_file_path
cat >> $reducer_file_path <<EOL
import { createReducer } from "typesafe-actions";
import { $action_type, $state_type } from "./types";

const initialState: $state_type = {};

const $reducer_name = createReducer<$state_type, $action_type>(initialState, {
  // [DO_SOMETING]: (state, action) => {
  //   const {} = action.payload;
  //   return { ...state };
  // }
});

export default $reducer_name;
EOL
