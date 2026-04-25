import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
/* import User from "./models/user.model.js"
import Workspace from "./models/workspace.model.js" */
import WorkspaceMember from "./models/workspaceMember.model.js"
import workspaceMemberRepository from "./repository/member.repository.js"
import userRepository from "./repository/user.repository.js"
import workspaceRepository from "./repository/workspace.repository.js"



connectMongoDB()

//workspaceRepository.create('test 1', 'test', 'test', true)

//workspaceMemberRepository.create('69936f9cbc903a2cb76c14e9','698ccf5288e8976b62166133', 'owner')

workspaceMemberRepository.getMemberList('69936f9cbc903a2cb76c14e9')

