import type { Visitor } from "@babel/traverse";
import { Apis } from './type';
const path = require('path');

const _dist = path.resolve(__dirname, 'ReRegExp.js');
let accept = false;

export default function(apis: Apis){
    const {types: t} = apis;
    const visitor: Visitor = {
        RegExpLiteral(path){
            const { pattern, flags } = path.node;

            path.replaceWith(
                t.newExpression(
                    t.identifier('ReRegExp'),
                    [
                        t.stringLiteral(pattern),
                        t.stringLiteral(flags)
                    ]
                )
            );
            accept = true;
        },
        CallExpression(path){
            if(t.isIdentifier(path.node.callee, {name: 'RegExp'})){
                path.replaceWith(t.newExpression(
                    t.identifier('ReRegExp'),
                    path.node.arguments
                ));
                accept = true;
            }
        },
        NewExpression(path){
            if(t.isIdentifier(path.node.callee, {name: 'RegExp'})){
                path.replaceWith(t.newExpression(
                    t.identifier('ReRegExp'),
                    path.node.arguments
                ));
                accept = true;
            }
        },
        Program: {
            enter(path){
                accept = false;
            },
            exit(path, status: any){
                if(accept)
                path.node.body.unshift(
                    t.variableDeclaration("const", [
                        t.variableDeclarator(
                            t.identifier('ReRegExp'),
                            t.callExpression(
                                t.identifier('require'),
                                [
                                    t.stringLiteral(_dist)
                                ]
                            )
                        )
                    ])
                )
            }
        }
    }

    return {
        name: 'regexp-polyfill',
        visitor
    }
}